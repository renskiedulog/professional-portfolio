export const homeContent = {
  name: "homeContent",
  title: "Home - Content",
  type: "document",
  fields: [
    {
      name: "aboutMe",
      title: "About Me",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "skills",
      title: "Skills",
      type: "object",
      fields: [
        {
          name: "techStackTitle",
          title: "Tech Stack Title",
          type: "string",
          initialValue: "Tech Stack",
        },
        {
          name: "techStack",
          title: "Tech Stack",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "name",
                  title: "Name",
                  type: "string",
                },
                {
                  name: "icon",
                  title: "Icon",
                  type: "image",
                },
              ],
            },
          ],
        },
        {
          name: "studyingTitle",
          title: "Studying Title",
          type: "string",
          initialValue: "Studying",
        },
        {
          name: "studying",
          title: "Currently Studying",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "name",
                  title: "Name",
                  type: "string",
                },
                {
                  name: "icon",
                  title: "Icon",
                  type: "image",
                },
              ],
            },
          ],
        },
        {
          name: "languagesAndToolsTitle",
          title: "Languages and Tools Title",
          type: "string",
          initialValue: "Languages and Tools",
        },
        {
          name: "languagesAndTools",
          title: "Languages and Tools",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "name",
                  title: "Name",
                  type: "string",
                },
                {
                  name: "icon",
                  title: "Icon",
                  type: "image",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "workExperience",
      title: "Work Experience",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "companyName",
              title: "Company Name",
              type: "string",
            },
            {
              name: "position",
              title: "Position",
              type: "string",
            },
            {
              name: "companyLogo",
              title: "Company Logo",
              type: "image",
            },
            {
              name: "startDate",
              title: "Start Date",
              type: "date",
            },
            {
              name: "endDate",
              title: "End Date",
              type: "date",
            },
          ],
        },
      ],
    },
    {
      name: "education",
      title: "Education",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "schoolName",
              title: "School Name",
              type: "string",
            },
            {
              name: "degree",
              title: "Degree/Certificate",
              type: "string",
            },
            {
              name: "schoolLogo",
              title: "School Logo",
              type: "image",
            },
            {
              name: "startDate",
              title: "Start Date",
              type: "date",
            },
            {
              name: "endDate",
              title: "End Date",
              type: "date",
            },
          ],
        },
      ],
    },
    {
      name: "projects",
      title: "Projects",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "sectionTitle",
              title: "Section Title",
              type: "string",
            },
            {
              name: "projectList",
              title: "Project List",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "title",
                      title: "Project Title",
                      type: "string",
                    },
                    {
                      name: "description",
                      title: "Description",
                      type: "text",
                    },
                    {
                      name: "image",
                      title: "Project Image",
                      type: "image",
                    },
                    {
                      name: "videoUrl",
                      title: "Video URL",
                      type: "url",
                    },
                    {
                      name: "githubLink",
                      title: "Github Link",
                      type: "url",
                    },
                    {
                      name: "stacks",
                      title: "Tech Stack",
                      type: "array",
                      of: [{ type: "string" }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
