package com.base.coreapi.model.calendar;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class CalendarDTO {

    private List<Addition> additions;

    private List<Holiday> holidays;

    private List<Restriction> restrictions;

    private List<Reservation> reservations;

    private List<Reservation> ownReservations;
}
