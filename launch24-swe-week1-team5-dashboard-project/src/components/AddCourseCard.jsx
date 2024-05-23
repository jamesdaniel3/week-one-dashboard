import Icon from '@mui/material/Icon';
import AddRounded from '@mui/icons-material/AddRounded';

export const AddCourseCard = ({handleOpen}) => {
          return (
              <>
                  <div className={"course-card plus"} onClick={handleOpen}>
                    <Icon className='icon' size='large'>
                        <AddRounded/>
                    </Icon>
                  </div>
              </>
          )
  }