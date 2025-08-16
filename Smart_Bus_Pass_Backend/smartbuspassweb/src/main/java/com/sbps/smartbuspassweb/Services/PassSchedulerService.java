package com.sbps.smartbuspassweb.Services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.sbps.smartbuspassweb.model.Pass;
import com.sbps.smartbuspassweb.repository.PassRepository;

@Service
public class PassSchedulerService {

    @Autowired
    private PassRepository passRepository;

    @Scheduled(cron = "0 19 18 * * ?") 
    public void deactivateExpiredPasses() {
        LocalDate today = LocalDate.now();
        System.out.println("🔄 Scheduler running at: " + today);

        List<Pass> expiredPasses = passRepository.findByValidToBeforeAndIsActive(today);

        System.out.println("🔍 Found expired passes: " + expiredPasses.size());

        for (Pass pass : expiredPasses) {
            pass.setActive(false);
            System.out.println("❌ Deactivated pass with ID: " + pass.getPassId());
        }

        if (!expiredPasses.isEmpty()) {
            passRepository.saveAll(expiredPasses);
            System.out.println("✅ Expired passes saved.");
        } else {
            System.out.println("ℹ️ No expired passes found.");
        }
    }
}
