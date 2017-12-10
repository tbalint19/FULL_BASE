package com.base.coreapi.service.calendar;

import com.base.coreapi.repository.calendar.ReservationRepository;
import com.base.coreapi.repository.calendar.RestrictionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository repository;

    @Autowired
    private RestrictionRepository adhocRestrictionRepository;
}
