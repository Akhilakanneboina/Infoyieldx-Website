package com.infoyieldx.infoyieldx.controller;

import com.infoyieldx.infoyieldx.model.HrModel;
import com.infoyieldx.infoyieldx.service.HrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000") // adjust for deployment
@RestController
@RequestMapping("/api/hr")
public class HrController {

    @Autowired
    private HrService hrService;

    @PostMapping("/submit")
    public HrModel submitMessage(@RequestBody HrModel hrModel) {
        return hrService.saveMessage(hrModel);
    }
}
