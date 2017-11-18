package com.base.coreapi.model.admin;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
public class AdminPasswordReset {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long adminId;

    private String code;

    private Boolean used;

    @Temporal(TemporalType.TIMESTAMP)
    private Date created;
}
