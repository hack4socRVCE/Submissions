package com.example.sms;

public class RequestObject {
    private String username;
    private String all_messages;
    public String getUsername() {
        return username;
    }
    public String getAll_messages() {
        return all_messages;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setAll_messages(String all_messages) {
        this.all_messages = all_messages;
    }
    public RequestObject(String username, String all_messages) {
        this.username = username;this.all_messages=all_messages;
    }

}
