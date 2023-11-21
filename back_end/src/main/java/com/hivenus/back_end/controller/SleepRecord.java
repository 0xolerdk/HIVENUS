package com.hivenus.back_end.controller;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "sleepTrack")
public class SleepRecord {
    private String Date;
    private String StartTime;
    private String EndTime;
    private String desc;

    public SleepRecord() {
    }

    public String getDate() {
        return Date;
    }

    public void setDate(String date) {
        Date = date;
    }

    public String getStartTime() {
        return StartTime;
    }

    public void setStartTime(String startTime) {
        StartTime = startTime;
    }

    public String getEndTime() {
        return EndTime;
    }

    public void setEndTime(String endTime) {
        EndTime = endTime;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    @Override
    public String toString() {
        return "SleepRecord{" +
                "Date='" + Date + '\'' +
                ", StartTime='" + StartTime + '\'' +
                ", EndTime='" + EndTime + '\'' +
                ", desc='" + desc + '\'' +
                '}';
    }
}
