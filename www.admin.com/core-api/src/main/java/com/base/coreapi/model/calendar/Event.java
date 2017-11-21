package com.base.coreapi.model.calendar;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    private Integer requiredNumberOfSpots;

    private Boolean available;

    @JsonIgnore
    @ManyToMany(mappedBy = "events")
    private Set<OrderDay> orderDays = new HashSet<>();
}
