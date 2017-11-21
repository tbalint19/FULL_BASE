package com.base.coreapi.service.calendar;

import com.base.coreapi.model.calendar.OrderDay;
import com.base.coreapi.repository.calendar.EventRepository;
import com.base.coreapi.repository.calendar.OrderDayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderDayService {

    @Autowired
    private OrderDayRepository repository;

    @Autowired
    private EventRepository eventRepository;

    public List<OrderDay> getOneWeek(Long monday) {
        Long oneWeek = 604800000L;
        Date after = new Date();
        Date before = new Date();
        after.setTime(monday);
        before.setTime(monday + oneWeek);
        return repository.findByDateAfterAndDateBefore(after, before);
    }

    public OrderDay getByDate(Long date) {
        Date asDate = new Date();

        Calendar startDate = Calendar.getInstance();
        startDate.setTime(asDate);
        startDate.set(startDate.get(Calendar.YEAR), startDate.get(Calendar.MONTH), startDate.get(Calendar.DAY_OF_MONTH), 0, 0, 0);

        Calendar endDate = Calendar.getInstance();
        endDate.setTime(asDate);
        endDate.set(endDate.get(Calendar.YEAR), endDate.get(Calendar.MONTH), endDate.get(Calendar.DAY_OF_MONTH), 23, 59, 59);

        return repository.findByDateBetween(startDate.getTime(), endDate.getTime());

    }

    public OrderDay getByDateOrCreate(Long date) {
        OrderDay orderDay = getByDate(date);
        if (orderDay == null){
            orderDay = new OrderDay();
            Date orderDaysDate = new Date();
            orderDaysDate.setTime(date);
            orderDay.setDate(orderDaysDate);
        }
        return orderDay;
    }

    public void save(OrderDay orderDay) {
        repository.save(orderDay);
    }
}
