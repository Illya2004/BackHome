package org.kolis1on.backhome.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFormat {

    // # -  DD/MM/YYY
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
