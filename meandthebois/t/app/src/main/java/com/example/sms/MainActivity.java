package com.example.sms;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.ActivityNotFoundException;
import android.content.ContentResolver;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Telephony;
import android.speech.RecognizerIntent;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;

import org.json.JSONObject;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.TimeZone;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    private ArrayList<String> smsList = new ArrayList<String>();
    private HashMap<Integer, ArrayList<String>> messages = new HashMap<Integer,ArrayList<String>>();
    public ArrayList<String> newList = new ArrayList<String>();


    public String j = "";
    private int counter = 0;

    private ListView listView;
    private static final int READ_SMS_PERMISSION_CODE = 1;
    private final int REQ_CODE=100;
    private int c=0;
    Button button;


    private TextView textView;

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == READ_SMS_PERMISSION_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                readSms();
                ArrayAdapter<String> adapter = (ArrayAdapter<String>) listView.getAdapter();
                adapter.notifyDataSetChanged();
            }
        }
    }

    private void readSms() {
        ContentResolver contentResolver = getContentResolver();
        Cursor cursor = contentResolver.query(
                Telephony.Sms.CONTENT_URI,
                null,
                null,
                null,
                null
        );
        if (cursor != null && cursor.moveToFirst()) {
            do {
                String address = cursor.getString(cursor.getColumnIndexOrThrow(Telephony.Sms.ADDRESS));
                String body = cursor.getString(cursor.getColumnIndexOrThrow(Telephony.Sms.BODY));
                long unixSeconds = cursor.getLong(cursor.getColumnIndexOrThrow(Telephony.Sms.DATE));
                Date date = new Date(unixSeconds); // *1000 is to convert seconds to milliseconds
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); // the format of your date
                sdf.setTimeZone(TimeZone.getTimeZone("GMT-4")); // give a timezone reference for formating (see comment at the bottom
                String formattedDate = sdf.format(date);
                if (address.substring(3).equals("PYTMBK") && counter<2) {
                    address = "Paytm";
                    smsList.add(formattedDate);
                    smsList.add(address);
                    smsList.add(body);
                    messages.put(c,smsList);
                    c++;
                    counter++;
                    smsList = new ArrayList<String>();
                }
                Gson gson = new Gson();
                j = gson.toJson(messages);
                Log.i("HASHMAP CHECK", j);
            } while (cursor.moveToNext());
        }
        if (cursor != null) {
            cursor.close();
        }
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode,resultCode,data);
        switch (requestCode){
            case REQ_CODE:{
                if (resultCode==RESULT_OK&&null!=data){
                    ArrayList result = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                    String k = (String) result.get(0);
                    String t = String.valueOf(new Date());
                    Call<ResponseObject> call = retrofitAPI.updateMic("vaibhav", "{\"mic\":[\""+ t + "\",\""+ k + "\"]}");
                    call.enqueue(new Callback<ResponseObject>() {
                        @Override
                        public void onResponse(Call<ResponseObject> call, Response<ResponseObject> response) {
                            Log.i("LOG SUxESS", String.valueOf(response));

                        }

                        @Override
                        public void onFailure(Call<ResponseObject> call, Throwable t) {
                            Toast.makeText(MainActivity.this, "Fail to get the data..", Toast.LENGTH_SHORT).show();
                        }
                    });
                    Log.i("checkeru",(String) result.get(0));
                }
                break;
            }
        }
    }

    Retrofit retrofit = new Retrofit.Builder().baseUrl("https://budgetbuddy-qyun.onrender.com/api/")
            .addConverterFactory(GsonConverterFactory.create())
            .build();
    RetrofitAPICall retrofitAPI = retrofit.create(RetrofitAPICall.class);


    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        button = findViewById(R.id.gotoURL);
        button.setOnClickListener(view -> {
            String url = "https://budgetbuddy-qyun.onrender.com/api/newimg";
            Intent urlIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(textView.getText().toString() + url));
            startActivity(urlIntent);
        });
        textView = findViewById(R.id.text_view_result);
        ImageView speak = findViewById(R.id.speak);
        speak.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
                intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
                intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault());
                intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Need to speak");
                try {
                    startActivityForResult(intent,REQ_CODE);
                } catch (ActivityNotFoundException a) {
                    Toast.makeText(MainActivity.this, "Sorry device not supported", Toast.LENGTH_SHORT).show();
                }
            }
        });

        Call<List<ResponseObject>> caller = retrofitAPI.updateLook();
        caller.enqueue(new Callback<List<ResponseObject>>() {
            @Override
            public void onResponse(Call<List<ResponseObject>> caller, Response<List<ResponseObject>> response) {
                Log.i("LOG VIEW PA", String.valueOf(response));
                List<ResponseObject> Resps = response.body();
                for(ResponseObject resp: Resps){
                    Log.i("Details",resp.getAmount() + " " + resp.getT_type());
                    textView.append("Amount :" + resp.getAmount() + "\n" +
                                "Timestamp :" + resp.getTimestamp() + "\n" +
                                "Transaction Type :" + resp.getT_type() + "\n" +
                                "Category :" + resp.getReceiver_category() + "\n\n"
                    );
                }
                }



            @Override
            public void onFailure(Call<List<ResponseObject>> caller, Throwable t) {
                Toast.makeText(MainActivity.this, "Fail to get the data..", Toast.LENGTH_SHORT).show();

            }
        });
        //listView = findViewById(R.id.listView);
        //ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_2, newList);
        //listView.setAdapter(adapter);

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_SMS)
                !=
                PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.READ_SMS}, READ_SMS_PERMISSION_CODE);
        } else {
            readSms();
            Log.i("PATTEDARI",j);
            Call<ResponseObject> call = retrofitAPI.updateUser("vaibhav", j);
            call.enqueue(new Callback<ResponseObject>() {
                @Override
                public void onResponse(Call<ResponseObject> call, Response<ResponseObject> response) {
                    Log.i("LOG SUCCESS", String.valueOf(response));
                }

                @Override
                public void onFailure(Call<ResponseObject> call, Throwable t) {
                    Toast.makeText(MainActivity.this, "Fail to get the data..", Toast.LENGTH_SHORT).show();
                }
            });
        }

    }

}