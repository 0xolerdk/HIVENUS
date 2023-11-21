package com.hivenus.back_end.controller;

import com.hivenus.back_end.SleepRecordRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
public class PostController {

    @Autowired
    SleepRecordRepo repo;

    @ApiIgnore
    @RequestMapping(value="/")
    public void redirect(HttpServletResponse response) throws IOException {
        response.sendRedirect("/swagger-ui.html");
    }

    @GetMapping("/allsrecords")
    public List<SleepRecord> getAllSleepRecords(){
        return repo.findAll();
    }

    @PostMapping("srecord")
    public SleepRecord postSleepRecord(@RequestBody SleepRecord sleepRecord){
        return repo.save(sleepRecord);
    }
}
