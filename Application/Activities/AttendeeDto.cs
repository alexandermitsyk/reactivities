﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Activities
{
    public class AttendeeDto
    {
        public string UserName { get; set; }

        public string DisplayName { get; set; }

        public string Image { get; set; }

        public bool IsHost { get; set; }
    }
}
