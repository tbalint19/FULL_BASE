package com.base.coreapi.model.faq;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
public class Faq {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    private String question;

    private String text;

    @Lob
    @Type(type="org.hibernate.type.BinaryType")
    private byte[] picture1;

    @Lob
    @Type(type="org.hibernate.type.BinaryType")
    private byte[] picture2;
}
