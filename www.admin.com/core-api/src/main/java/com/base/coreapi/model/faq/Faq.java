package com.base.coreapi.model.faq;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
@NoArgsConstructor
public class Faq {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    private String question;

    private String text;

    private byte[] picture1;

    private byte[] picture2;
}
