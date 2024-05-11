package org.kolis1on.backhome.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFormat {

    // # -  DD/MM/YYY
    public static Long dateToTimestamp(String dateString) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");
        try {
            Date date = dateFormat.parse(dateString);

            return date.getTime();


        } catch (ParseException e) {
            e.printStackTrace();
        }

        return 0L;
    }
}
