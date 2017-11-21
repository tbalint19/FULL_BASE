package com.base.coreapi.model.calendar.dto;

import com.base.coreapi.model.calendar.Event;
import com.base.coreapi.model.calendar.Slot;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class OrderDayCreatorDTO {

    private Long date;

    private List<Event> events;

    private List<Slot> slots;
}
