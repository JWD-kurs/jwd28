package jwd.wafepa.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jwd.wafepa.model.Activity;
import jwd.wafepa.service.ActivityService;
import jwd.wafepa.util.ActivityDTOToActivity;
import jwd.wafepa.util.ActivityToActivityDTO;
import jwd.wafepa.web.dto.ActivityDTO;

@RestController
@RequestMapping(value="/api/activities")
public class ApiActivityController {
	@Autowired
	private ActivityService activityService;
	@Autowired
	private ActivityDTOToActivity toActivity;
	@Autowired
	private ActivityToActivityDTO toDto;
	
	@RequestMapping(method=RequestMethod.GET)
	ResponseEntity<List<ActivityDTO>> getActivities(
			@RequestParam(required=false) String name){
		List<Activity> activities;
		
		if(name == null) {
			activities = activityService.findAll();
		}else {
			activities = activityService.findByName(name);
		}
		
		
		return new ResponseEntity<>(toDto.convert(activities),
				HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	ResponseEntity<ActivityDTO> getActivity(@PathVariable Long id){
		Activity activity = activityService.findOne(id);
		if(activity==null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(toDto.convert(activity),
				HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	ResponseEntity<ActivityDTO> delete(@PathVariable Long id){
		Activity deleted = activityService.delete(id);
		
		if(deleted==null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(toDto.convert(deleted),
				HttpStatus.OK);
	}
	
	@RequestMapping(method=RequestMethod.POST,
					consumes="application/json")
	public ResponseEntity<ActivityDTO> add(
			@RequestBody ActivityDTO newActivity){
		Activity converted = toActivity.convert(newActivity);
		Activity savedActivity = activityService.save(converted);
		
		return new ResponseEntity<>(
				toDto.convert(savedActivity),
				HttpStatus.CREATED);
	}
	
	
	@RequestMapping(method=RequestMethod.PUT,
			value="/{id}",
			consumes="application/json")
	public ResponseEntity<ActivityDTO> edit(
			@RequestBody ActivityDTO activity,
			@PathVariable Long id){
		
		if(!id.equals(activity.getId())){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		Activity converted = toActivity.convert(activity);
		Activity persisted = activityService.save(converted);
		
		return new ResponseEntity<>(
				toDto.convert(persisted),
				HttpStatus.OK);
	}
	
	
}
