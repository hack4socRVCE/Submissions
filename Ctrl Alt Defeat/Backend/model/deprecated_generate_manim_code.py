import torch
from langchain_community.llms.huggingface_pipeline import HuggingFacePipeline
from transformers import AutoModelForCausalLM, AutoTokenizer, GenerationConfig, pipeline

class GenerationModel:
    def __init__(self, model_name) -> None:
        torch.cuda.empty_cache()
        self.model_name = model_name
        self.model = AutoModelForCausalLM.from_pretrained(
            self.model_name,
            device_map="auto",
            trust_remote_code=True,
            revision="main"
        )
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name, use_fast=True)
        self.generation_config = GenerationConfig.from_pretrained(self.model_name)
        self.generation_config.max_new_tokens = 1024
        self.generation_config.temperature = 0.0001
        self.generation_config.top_p = 0.95
        self.generation_config.do_sample = True
        self.generation_config.repetition_penalty = 1.15

    def createPrompt(self, text):
        return f'''[INST]{text}[/INST]'''

    def generate(self, text):
        prompt = self.createPrompt(text)

        text_pipeline = pipeline(
            "text-generation",
            model=self.model,
            tokenizer=self.tokenizer,
            generation_config=self.generation_config,
        )

        llm = HuggingFacePipeline(pipeline=text_pipeline, model_kwargs={"temperature": 0})
        result = llm(
            "Explain the difference between ChatGPT and open source LLMs in a couple of lines."
        )
        return result

if __name__ == "__main__":
    generator = GenerationModel(model_name="TheBloke/Llama-2-7b-GPTQ")
    print(generator.generate("Hello, How are you?"))