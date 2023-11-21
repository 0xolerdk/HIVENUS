package com.hivenus.back_end;

import com.hivenus.back_end.controller.SleepRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SleepRecordRepo extends MongoRepository<SleepRecord,String> {

}
