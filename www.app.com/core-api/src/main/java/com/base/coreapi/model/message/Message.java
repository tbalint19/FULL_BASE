package com.base.coreapi.model.message;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(columnDefinition = "text")
    private String text;

    @JsonIgnore
    @ManyToOne
    private Channel channel;

    private Boolean isUserMessage;

    private Date created;
}
