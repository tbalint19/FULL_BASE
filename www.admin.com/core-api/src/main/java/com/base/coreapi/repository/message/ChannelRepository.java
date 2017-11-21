package com.base.coreapi.repository.message;

import com.base.coreapi.model.messages.Channel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChannelRepository extends CrudRepository<Channel, Long> {
}
