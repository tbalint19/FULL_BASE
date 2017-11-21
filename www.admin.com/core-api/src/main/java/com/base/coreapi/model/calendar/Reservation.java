package com.base.coreapi.model.calendar;

import com.base.coreapi.model.auth.ApplicationUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    private ApplicationUser user;

    @JsonIgnore
    @ManyToOne
    private Event event;
}
