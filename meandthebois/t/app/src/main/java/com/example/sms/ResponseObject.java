package com.example.sms;

public class ResponseObject {
    private String username;
    private String all_messages;

    private String timestamp;
    private String sender;
    private String receiver;
    private String amount;

    private String receiver_category;
    private String advice;

    private String t_type;

    public String getAmount() {
        return amount;
    };

    public String getReceiver_category() {
        return receiver_category;
    };

    public String getTimestamp() {
        return timestamp;
    };

    public String getT_type() {
        return t_type;
    }

    public String getUsername() {
        return username;
    };



    public ResponseObject(String username,String all_messages,String timestamp,String sender,String receiver,String amount,String receiver_category,String advice,String t_type ) {
        this.username = username;
        this.all_messages = all_messages;
        this.timestamp = timestamp;
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
        this.receiver_category = receiver_category;
        this.advice = advice;
        this.t_type = t_type;

    }

}
