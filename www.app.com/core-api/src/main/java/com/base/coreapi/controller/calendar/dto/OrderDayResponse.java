package com.base.coreapi.controller.calendar.dto;

import com.base.coreapi.model.calendar.Event;
import com.base.coreapi.model.calendar.Slot;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
public class OrderDayResponse {

    private Long id;

    private Date date;

    private List<Slot> slots;

    private List<Event> events;
}
