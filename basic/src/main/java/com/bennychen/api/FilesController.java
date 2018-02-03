package com.bennychen.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
public class FilesController {

    @CrossOrigin(origins = "http://localhost:8083")
    @RequestMapping("/api/meta")
    public List<Map<String,String>> getMeta(HttpServletRequest httpServletRequest) throws IOException {
        return null;
    }

    private Map<String, String> buildFileMap(String title, String url) {
        Map<String, String> map = new HashMap<>();
        map.put("title", title);
        map.put("url", url);
        return map;
    }


}
