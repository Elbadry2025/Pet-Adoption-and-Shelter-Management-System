package Shelter.Pet_Adoption_System.controller.Backup;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173/")
@RequiredArgsConstructor
public class BackupController {

    private static final Logger logger = LoggerFactory.getLogger(BackupController.class);

    @PostMapping("/backup")
    public void backup() {
        try {
            String dbName = "petshelter";
            String dbUser = "root";
            String dbPass = "123456";

            String folderPath = "C:/Users/moham/Desktop/backup";
            String savePath = folderPath + "/backup.sql";

            String executeCmd = "C:/Program Files/MySQL/MySQL Workbench 8.0/mysqldump.exe -u " + dbUser + " -p" + dbPass + " --databases " + dbName + " -r " + savePath;

            Process runtimeProcess = Runtime.getRuntime().exec(executeCmd);
            int processComplete = runtimeProcess.waitFor();

            if (processComplete == 0) {
                logger.info("Backup Complete");
            } else {
                logger.info("Backup Failure");
                readProcessOutput(runtimeProcess);
            }

        } catch (IOException | InterruptedException ex) {
            logger.error("Error at Backuprestore", ex);
        }
    }

    private void readProcessOutput(Process process) throws IOException {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            reader.lines().forEach(logger::info);
        }
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {
            reader.lines().forEach(logger::error);
        }
    }

    @PostMapping("/restore")
    public void restore() {
        try {
            String dbName = "petshelter";
            String dbUser = "root";
            String dbPass = "123456";

            String folderPath = "C:/Users/moham/Desktop/backup";
            String sourcePath = folderPath + "/backup.sql";

            String[] executeCmd = new String[]{"C:/Program Files/MySQL/MySQL Workbench 8.0/mysql.exe", "-u" + dbUser, "-p" + dbPass, dbName, "-e", "source " + sourcePath};

            Process runtimeProcess = Runtime.getRuntime().exec(executeCmd);
            int processComplete = runtimeProcess.waitFor();

            if (processComplete == 0) {
                logger.info("Restore Complete");
            } else {
                logger.info("Restore Failure");
                readProcessOutput(runtimeProcess);
            }

        } catch (IOException | InterruptedException ex) {
            logger.error("Error at Backuprestore", ex);
        }
    }

}
