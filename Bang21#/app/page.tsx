'use client';

// import { Form } from '@/components/form';
import {useEffect, useRef } from 'react';
import { FunctionCallHandler, nanoid } from 'ai';
import { Message, useChat } from 'ai/react';
import { OpenAiHandler } from "openai-partial-stream";
import { ErrorBoundary } from "react-error-boundary";
import dynamic from 'next/dynamic';
import RiskAnalysisTable from '@/components/home/risktable';
import Home, { HomeProps } from '@/components/home';
import Sidebar from '@/components/sidebar';
import Head from 'next/head';
import { useState } from 'react';
import { parseStreamingFunctionCall, parseStreamingJsonString } from '../lib/parseStreamingJson';
const kmlFileUrls = [
    '/kml/stormwaterdrains.kml', // Assuming you have example1.kml in the public/kml directory
    '/kml/waterdepth.kml',
    "/kml/flood.kml",
    "/kml/kaaqms.kml",
    "/kml/cctv.kml",
    "/kml/firestations.kml",
    "/kml/slums.kml",
    // "/kml/metrostations.kml"
     // Assuming you have example2.kml in the public/kml directory
    // Add more KML file URLs as needed
  ];
  const iconMapping = {
    'waterdepth': '/icons/yellow.png',
    'flood': '/icons/red.png',
    'kaaqms': '/icons/airquality.svg',
    'cctv': '/icons/cctv-camera.png',
    'firestations': '/icons/firestation.png'

  };
  const Form = dynamic(() => import('../components/form'), { ssr: false });

const Map = dynamic(() => import('../components/map/map'), {
    ssr: false,
});

function fallbackRender({ error, resetErrorBoundary }: any) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{ color: "red" }}>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
}
const roleToColorMap: Record<Message['role'], string> = {
    system: 'red',
    user: 'black',
    function: 'blue',
    tool: 'purple',
    assistant: 'green',
    data: 'orange',
};

export default function Chat() {
    const functionCallHandler: FunctionCallHandler = async (
        chatMessages,
        functionCall,
    ) => {
        
        console.log('functionCall', functionCall);
        if (functionCall.name === 'eval_code_in_browser') {
            if (functionCall.arguments) {
                try {
                    const parsedFunctionCallArguments: { code: string } = parseStreamingJsonString(
                        functionCall.arguments,
                    );
                    console.log('parsedFunctionCallArguments', parsedFunctionCallArguments);
                    // WARNING: Do NOT do this in real-world applications!
                    eval(parsedFunctionCallArguments.code);
                    const functionResponse = {
                        messages: [
                            ...chatMessages,
                            {
                                id: nanoid(),
                                name: 'eval_code_in_browser',
                                role: 'function' as const,
                                content: parsedFunctionCallArguments.code,
                            },
                        ],
                    };

                    return functionResponse;
                } catch (error) {
                    console.error(error);
                    return;
                }
            }
        }
    };

    const [query, setQuery] = useState('');
    const [mode, setMode] = useState<'home' | 'tools'>('home')
    const [apiKey, setApiKey] = useState<string | null>(null);

    const [modelResponse, setModelResponse] = useState<any>(null);
    const { messages, input, handleInputChange, handleSubmit, append } = useChat({
        api: '/api/chat-with-functions-2',
        body: {
            apiKey,
        },
        experimental_onFunctionCall: functionCallHandler,
    });

    const submitFirstQuery: HomeProps['runQuery'] = ({ query, apiKey }) => {
        setQuery(query);
        setApiKey(apiKey);
        append({
            id: nanoid(),
            role: 'user',
            content: query,
            createdAt: new Date(),
        }, {
            options: {
                body: {
                    apiKey,
                }
            }
        });
        setMode('tools');
    };

    const onSubmitFormComponent = async (formValues: any) => {
        console.log('onSubmitFormComponent', formValues);
        console.log('Form submitted with values:', formValues);
        const formEntries = Object.entries(formValues.formData).map(([key, value]) => `${key}: ${value}`);
        const formDetails = formEntries.join(', ');
    console.log(formDetails)
        const newPrompt = `I am an insurance provider, these are the parameters of the user's building: ${formDetails}. Give me the risk analysis report for the building in a json like table header and data for formdata which I provided, and conclude the verdict. Make three columns: criteria, details, and remarks, keep the report precise and data oriented, give reasons for the verdict, keep it brief and packed with heavy data, assume data wherever needed, add some numerical data too.`;
    
        const response = await fetch('/api/risktable', { // Assuming '/api/route' is your API endpoint in route.ts
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPrompt }),
        });
    
        const data = await response.json();
    console.log("hehhehhhh",data)
        const messageContent = data.message?.content || "No response";
    
        setModelResponse(messageContent); 
        // 
        const formResponse: Message = {
            id: nanoid(),
            name: 'create_simple_form',
            role: 'function' as const,
            // content: formValues,
            content: JSON.stringify(formValues.formData),
            // content: (formValues.formData),
        };
        append(formResponse);
    }

    const isBigMessage = (message: Message) => {
        return message.function_call && JSON.stringify(message.function_call).includes('create_dynamic_map')
    };
    const bigMessages = messages.filter(isBigMessage);
    const chatMessages = messages.filter((msg) => !isBigMessage(msg))
    .filter(message => message.role !== 'system' && message.role !== 'function')

    const bigMessage = bigMessages[bigMessages.length - 1];

    return (
        <>
            <Head>
                <title>BangMaps</title>
            </Head>
            <div className={`mode-${mode}`}>
                {mode === 'home' && (
                    <Home runQuery={submitFirstQuery} />
                )}
                {mode === 'tools' && (
                    <div className={"tools"}>
                        <Sidebar messages={chatMessages} onSubmitFormComponent={onSubmitFormComponent} ShowMessage={ShowMessage}>
                            {bigMessage && <ShowMessage message={bigMessage} onSubmitFormComponent={onSubmitFormComponent} modelResponse={modelResponse} />}
                        </Sidebar>
                    </div>
                )}
            </div>
        </>
    )

    return (
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            {messages.length > 0
                ? messages.map((m: Message) => {
                    if (m.role === 'system') {
                        return null;
                    }
                    const json = typeof m.function_call === 'string' ? parseStreamingJsonString(m.function_call) : m.function_call;
                    const isFunctionCallDone = typeof m.function_call === 'object';

                    // const json = typeof m.function_call === "object" ? m.function_call : null;
                    return (
                        <div
                            key={m.id}
                            className="whitespace-pre-wrap"
                            style={{ color: roleToColorMap[m.role] }}
                        >
                            <strong>{`${m.role}: `}</strong>
                            {m.content ? (
                                m.content
                            ) :
                                (<>
                                    <ErrorBoundary
                                        fallbackRender={fallbackRender}
                                        resetKeys={[JSON.stringify(json)]}>
                                        <pre>
                                            {JSON.stringify(json, null, 2)}
                                        </pre>
                                        <div>{isFunctionCallDone ? "Done!" : "Writing..."}</div>
                                        <DynamicComponent functionCall={json} onSubmit={onSubmitFormComponent} />
                                    </ErrorBoundary>
                                </>
                                )}
                            {/* {m.content || JSON.stringify(m.function_call)} */}
                            <br />
                            <br />
                        </div>
                    );
                })
                : null}
            <div id="chart-goes-here"></div>
            <form onSubmit={handleSubmit}>
                <input
                    className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                />
            </form>
        </div>
    );
}

function ShowMessage({ message: m, onSubmitFormComponent, modelResponse }: { message: Message, onSubmitFormComponent: any, modelResponse: any }) {
    const isFunctionCallDone = typeof m.function_call === 'object';
    return (
        <div
            key={m.id}
            className="whitespace-pre-wrap"
            style={{ color: roleToColorMap[m.role] }}
        >
            <strong>{`${m.role.toUpperCase()}: `}</strong>
        
            {m.content ? (
                m.content
            ) :
                (<>
                    <ErrorBoundary
                        fallbackRender={fallbackRender}
                        // resetKeys={[JSON.stringify(json)]}>
                        resetKeys={[JSON.stringify(m.function_call)]}>
                        <div>{isFunctionCallDone ? "" : "Writing..."}</div>
                        <DynamicComponent functionCall={m.function_call} onSubmit={onSubmitFormComponent} modelResponse={modelResponse}/>
                    </ErrorBoundary>
                </>
                )}
            <br />
            <br />
        </div>
    );
}

function DynamicComponent({ functionCall: functionCallRaw, onSubmit ,modelResponse}: any) {
    const [kmlResponse, setKmlResponse] = useState(null);
    
    const prevState = useRef<any>({});
   
    if (!functionCallRaw) {
        return null;
    }
    const functionCallJson = typeof functionCallRaw === 'string' ? parseStreamingFunctionCall(functionCallRaw) : functionCallRaw;

    const functionCall = functionCallJson.function_call ?? functionCallJson;

    if (functionCall.name === 'create_simple_form') {
        if (!functionCall.arguments) {
            return <div>
                Writing form...
            </div>
        }
        const args = parseStreamingJsonString(functionCall.arguments) ?? {};
        try {
            const { jsonSchema: jsonSchemaString, uiSchema: uiSchemaString } = args;
            const jsonSchema = jsonSchemaString ? parseStreamingJsonString(jsonSchemaString) : {};
            const uiSchema = uiSchemaString ? parseStreamingJsonString(uiSchemaString) : {};
            prevState.current.args = args;
            prevState.current.jsonSchema = jsonSchema;
            prevState.current.uiSchema = uiSchema;
        } catch (error) {
            console.error(error);
        }

        const { jsonSchema, uiSchema } = prevState.current;

        return <div>
            <ErrorBoundary
                fallbackRender={fallbackRender}
                resetKeys={[JSON.stringify(jsonSchema), JSON.stringify(uiSchema)]}>
                <Form jsonSchema={jsonSchema} uiSchema={uiSchema} onSubmit={onSubmit} />
            </ErrorBoundary>
        </div>
    }
    else if (functionCall.name === 'create_dynamic_map') {
        if (!functionCall.arguments) {
            return <div>
                Map...
            </div>
        }
        try {
            const args = parseStreamingJsonString(functionCall.arguments);
            const locationToPoint = (loc: any) => ((loc && loc?.lat && loc?.lon) ? [loc.lat, loc.lon] : null);
            const centerPosition = args?.center ? locationToPoint(args?.center) : null
            const zoomLevel = args?.zoomLevel ?? 25;
            const markers = args?.markers?.map((marker, markerIndex) => ({
                label: `${markerIndex + 1}. ${marker?.label}`,
                position: locationToPoint(marker),
                color: marker?.color,
            })) ?? [];
            const readyMarkers = markers.filter(marker => {
                const hasPosition = marker.position && marker.position.length === 2 && marker.position.every(x => typeof x === 'number');
                return hasPosition;
            });
            const startPosition = centerPosition ?? (
                readyMarkers.length > 0 ? (readyMarkers.reduce((acc, marker) => {
                    acc[0] += marker.position[0];
                    acc[1] += marker.position[1];
                    return acc;
                }, [0, 0])
                    .map(x => x / readyMarkers.length)
                ) : null);
            prevState.current.startPosition = startPosition;
            prevState.current.markers = readyMarkers;
            prevState.current.zoomLevel = zoomLevel;
        } catch (error) {
        }

        const { startPosition, markers, zoomLevel } = prevState.current;
        console.log("sss",startPosition);
        console.log("mmm",markers)
        console.log("zzzz",zoomLevel)
        console.log("ohhhh",modelResponse)
        return (
            <div>
                <div style={{ 'height': '100vh' }}>
                    <ErrorBoundary fallbackRender={fallbackRender} resetKeys={[JSON.stringify(startPosition), JSON.stringify(markers)]}>
                        {startPosition && (
                            <Map center={startPosition} markers={markers} zoomLevel={zoomLevel} kmlFiles={kmlFileUrls} iconMapping={iconMapping} />
                        )}
                    </ErrorBoundary>
                </div>
                <div>
                    
                         {modelResponse && <RiskAnalysisTable modelResponse={modelResponse} />}
                
                </div>
            </div> // This closing tag matches the opening <div> tag at the start
        );
        
    }

    if (JSON.stringify(functionCall).includes('create_simple_form')) {
        console.log('weird', functionCall);
    }

    return <>
        <div>Writing...</div>
    </>
}
