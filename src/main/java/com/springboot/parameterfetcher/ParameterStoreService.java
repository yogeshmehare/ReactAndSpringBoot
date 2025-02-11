package com.springboot.parameterfetcher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.ssm.SsmClient;
import software.amazon.awssdk.services.ssm.model.GetParameterRequest;
import software.amazon.awssdk.services.ssm.model.GetParameterResponse;

@Service
public class ParameterStoreService {
    private final SsmClient ssmClient;
    private String AWS_ACCESS_KEY;
    private String AWS_SECRET_KEY;

    public ParameterStoreService(@Value("${aws.access.key}") String key,@Value("${aws.secret.key}") String secret) {
        this.AWS_ACCESS_KEY = key;
        this.AWS_SECRET_KEY = secret;
        this.ssmClient = SsmClient.builder()
                .region(Region.US_EAST_1)
                .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create(
                        AWS_ACCESS_KEY,
                        AWS_SECRET_KEY
                )))
                .build();
    }

    public String getParameter(String parameterName) {
        GetParameterRequest request = GetParameterRequest.builder()
                .name(parameterName)
                .withDecryption(true)
                .build();

        GetParameterResponse response = ssmClient.getParameter(request);
        return response.parameter().value();
    }
}
