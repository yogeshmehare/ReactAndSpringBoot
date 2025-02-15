package com.springboot.storparameterekeys;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Data
@Entity
@Table(name = "key_value")
public class KeyValue {
    @Id
    @Column(name = "mykey")
    private String key;

    @Column(name = "myvalue")
    private String value;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public KeyValue(String key, String value) {
        this.key = key;
        this.value = value;
    }

    public KeyValue(){}
}
