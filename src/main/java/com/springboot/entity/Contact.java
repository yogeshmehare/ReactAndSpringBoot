package com.springboot.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "contacts")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int contactId;
    @Column(name = "Name")
    private String contactName;
    @Column(name = "Address")
    private String contactAddress;
}
