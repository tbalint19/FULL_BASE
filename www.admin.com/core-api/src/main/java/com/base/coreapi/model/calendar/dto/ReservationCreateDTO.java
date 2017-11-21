package com.base.coreapi.model.calendar.dto;

import com.base.coreapi.model.auth.ApplicationUser;
import com.base.coreapi.model.calendar.Event;
import com.base.coreapi.model.calendar.Slot;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ReservationCreateDTO {

    private ApplicationUser user;

    private List<Slot> slots;

    private Event event;
}
