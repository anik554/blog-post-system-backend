export interface ICategory{
    name: CategoryType;
    description?: string;
}

export enum CategoryType {
  DOT_NET = ".NET",
  AI = "AI",
  BLOCKCHAIN = "Blockchain",
  BLOG = "Blog",
  BUSINESS = "Business",
  DATA_ENGINEERING = "Data Engineering",
  DBI = "DBI",
  GOLANG = "Golang",
  JAVA = "Java",
  JAVASCRIPT = "JavaScript",
  MOBILE_APP_DEVELOPMENT = "Mobile App Development",
  MVP = "MVP",
  PERSONAL = "Personal",
  PROGRAMMING = "Programming & Development",
  PYTHON = "Python",
  REACT = "React",
  SOFTWARE_DEVELOPMENT = "Software Development",
  SQL_SERVER = "SQL Server",
  STAFF_AUGMENTATION = "Staff Augmentation",
  TECHNOLOGY = "Technology",
  WEB = "Web",
}