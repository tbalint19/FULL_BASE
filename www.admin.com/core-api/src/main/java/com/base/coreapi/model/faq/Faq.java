package com.base.coreapi.model.faq;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CollectionId;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
public class Faq {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    @Column(columnDefinition = "text")
    private String question;

    @Column(columnDefinition = "text")
    private String text;

    private String picture1name;

    private String picture2name;
}
