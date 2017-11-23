package com.base.coreapi.model.calendar;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
public class OrderDay {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private Date date;

    @OneToMany(mappedBy = "orderDay")
    private List<Slot> slots;

    @JsonIgnore
    @ManyToMany(cascade = { CascadeType.MERGE })
    @JoinTable(name = "OrderDay_Event",
        joinColumns = { @JoinColumn(name = "orderDay_id") },
        inverseJoinColumns = { @JoinColumn(name = "event_id") })
    private Set<Event> events = new HashSet<>();
}
