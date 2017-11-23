package com.base.coreapi.model.info;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
public class MainMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    private String text;

    @Enumerated(value = EnumType.STRING)
    private InfoType type;

    private String identifier;
}
