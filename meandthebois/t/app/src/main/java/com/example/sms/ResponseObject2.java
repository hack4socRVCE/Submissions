package com.example.sms;

public class ResponseObject2 {
    private String username;

    private String text;
    private String timestamp;
    private String img_file;
    public String getUsername() {
        return username;
    };
    public String getImg_file() {
        return img_file;
    };

    public String getTimestamp() {
        return timestamp;
    };

    public String getText() {
        return text;
    }





    public ResponseObject2(String username,  String timestamp, String text, String img_file ) {
        this.username = username;
        this.timestamp = timestamp;
        this.text = text;
        this.img_file = img_file;


    }

}
