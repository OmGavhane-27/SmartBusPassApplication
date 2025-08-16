package com.sbps.smartbuspassweb.Services;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sbps.smartbuspassweb.model.Pass;
import com.sbps.smartbuspassweb.model.User;
import com.sbps.smartbuspassweb.repository.PassRepository;
@Service
public class NotificationService {

    @Autowired
    private PassRepository passRepo;

    @Autowired
    private NotificationSender notificationSender;

    public List<String> getExpiryNotificationsForUser(int userId) {
        List<Pass> passes = passRepo.findByUser_id(userId);
        List<String> notifications = new ArrayList<>();

        LocalDateTime now = LocalDateTime.now();

        for (Pass p : passes) {
            if (!p.isActive()) continue;

            String passType = p.getPassType().toUpperCase();
            LocalDateTime expiry = p.getExpiryDate();
            User user = p.getUser(); 

            if (user == null || user.getEmail() == null) continue;

            if (passType.equalsIgnoreCase("DAILY PASS")) {
                Duration duration = Duration.between(now, expiry);
                long minutesLeft = duration.toMinutes();

                if (minutesLeft <= 120 && minutesLeft > 0) {
                    String msg = "Your DAILY bus pass will expire in " + minutesLeft +
                            " minutes (at " + expiry + "). Please renew soon.";
                    notifications.add(msg);
                    notificationSender.send(user.getEmail(), "Bus Pass Expiry Alert", msg);
                }

            } else if (passType.equalsIgnoreCase("MONTHLY PASS")) {
                long daysLeft = Duration.between(now, expiry).toDays();
                System.out.println(daysLeft);
                if (daysLeft <= 3 && daysLeft >= 0) {
                    String msg = "Your MONTHLY bus pass will expire in " + daysLeft +
                            " day(s) (on " + expiry.toLocalDate() + "). Please renew soon.";
                    notifications.add(msg);
                    notificationSender.send(user.getEmail(), "Bus Pass Expiry Alert", msg);
                }
            }

        }

        return notifications;
    }
}
