package com.base.coreapi.model.calendar;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
public class Slot {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private Boolean active;

    private Date start;

    @JsonIgnore
    @ManyToOne
    private OrderDay orderDay;

    @OneToOne
    private Reservation reservation;
}
