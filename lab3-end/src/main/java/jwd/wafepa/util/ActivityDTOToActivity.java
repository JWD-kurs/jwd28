package jwd.wafepa.util;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import jwd.wafepa.model.Activity;
import jwd.wafepa.service.ActivityService;
import jwd.wafepa.web.dto.ActivityDTO;

@Component
public class ActivityDTOToActivity 
	implements Converter<ActivityDTO, Activity> {
	
	@Autowired
	private ActivityService activityService;

	@Override
	public Activity convert(ActivityDTO dto) {
		Activity retVal;
		
		if(dto.getId() == null) {
			retVal = new Activity();
		}else {
			retVal = activityService.findOne(dto.getId());
		}
		
		retVal.setId(dto.getId());
		retVal.setName(dto.getName());
		
		return retVal;
	}

	public List<Activity> convert(List<ActivityDTO> dtos){
		List<Activity> retVal = new ArrayList<>();
		
		for(ActivityDTO dto : dtos) {
			retVal.add(convert(dto));
		}
		
		return retVal;
	}
}
