package com.base.coreapi.repository.calendar;

import com.base.coreapi.model.calendar.OrderDay;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderDayRepository extends CrudRepository<OrderDay, Long> {

    List<OrderDay> findByDateAfter(Date date);
}
