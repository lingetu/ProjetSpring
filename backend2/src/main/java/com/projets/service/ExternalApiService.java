package com.projets.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ExternalApiService {

    @Value("${external.api.url}")
    private String externalApiUrl;

    public void callExternalApi() {
        System.out.println("External API URL: " + externalApiUrl);
    }
}
