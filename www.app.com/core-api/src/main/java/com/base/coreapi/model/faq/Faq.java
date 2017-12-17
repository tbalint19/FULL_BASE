package com.base.coreapi.model.faq;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
public class Faq {

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    private String question;

    private String text;

    private String picture1name;

    private String picture2name;
}
