package com.example.sms;

import android.os.Environment;

import java.io.File;
import java.util.List;

import okhttp3.MultipartBody;
import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;

public interface RetrofitAPICall {
        @FormUrlEncoded
        @POST("newtrans")
        Call<ResponseObject> updateUser(@Field("username") String first, @Field("all_messages") String last);

        @FormUrlEncoded
        @POST("newmic")
        Call<ResponseObject> updateMic(@Field("username") String first, @Field("all_messages") String last);

        @GET("newtrans")
        Call<List<ResponseObject>> updateLook();

         }
