package org.kolis1on.backhome;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Main {
    public static void main(String[] args) {
        System.out.println(dateToTimestamp("29.09.2004"));
    }

    public static Long dateToTimestamp(String dateString) {
        long timestamp = 0;
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");
        try {
            Date date = dateFormat.parse(dateString);

            timestamp = date.getTime();


        } catch (ParseException e) {
            e.printStackTrace();
        }

        return timestamp;
    }
}
