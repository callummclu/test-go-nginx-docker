import styles from "../styles/sass/banner.module.scss";

import {
  Avatar,
  Container,
  Anchor,
  Space,
  Text,
  Title,
  Flex,
  Timeline,
  Stack,
  Group,
  Box,
  Badge,
} from "@mantine/core";
import { Loader, LoadingOverlay } from "@mantine/core";
import { Fragment, useEffect, useState } from "react";
import { getAllSpotlights } from "../api/posts";
import "../styles/sass/projects.module.scss";
import { ProjectItem, ProjectPost } from "../components/project_item";
import { motion, Variants } from "framer-motion";
import Head from "next/head";
import { useWindowEvent } from "@mantine/hooks";
import { TechnologyCard } from "../components/Technology";
import { RiArrowRightSLine } from "react-icons/ri";
const technologies = [
  "react",
  "typescript",
  "csharp",
  "java",
  "go",
  "python",
  "nodejs",
];

interface ExperienceProps {
  company: string;
  title: string;
  period: string;
  description: JSX.Element;
  current: boolean;
  image: string;
}

const experiences: ExperienceProps[] = [
  {
    company: "Guitarguitar",
    title: "Software Engineer",
    period: "Jun 2022 - Present",
    description: (
      <>
        {" "}
        • Helped maintain a top 100 UK e-commerce website, alongside implement
        new features based on the company’s different departments needs/wants.
        <br />• Used React and .NET (C#) to help develop a new admin side
        content management system, further used these technologies to work on
        barcode scanning systems.
        <br />• Followed many standard agile procedures, such as daily
        stand-ups, knowledge sharing alongside participating in spec’ing
        sessions in which I was the product owner.
        <br />• Utilised Azure DevOps to enforce agile workflow, enabling me to
        take part in pull request reviews and better understand the whole
        system.
        <br />• Lead and owned the addition of the clearpay payment method to
        the high traffic site, utilising Test Driven Development alongside
        regular peer programming to both explain my process to the team and
        understand better methods of approaching the same problems • During my
        time here I learned how to work on a massive piece of software and
        understand the methods used to keep a system like this running 24/7.
      </>
    ),
    current: true,
    image: "https://static.callummclu.co.uk/experience/guitarguitar-logo.webp",
  },
  {
    company: "Evata",
    title: "Full-stack engineer",
    period: "Mar 2022 - Jun 2022",
    description: (
      <>
        • Built and implement a full stack web service.
        <br />• Used Typescript, node.js and express.js to create a backend
        service that would forward calls to a separate spring backend to deal
        with API calls such as REST api calls to improve security.
        <br />• Created a responsive frontend using typescript, React as well as
        materialUI to allow users to have a clean communication point to backend
        services.
        <br />• Utilised Jira and Miro to enforce an agile work flow utilising a
        kanban board along with regular retrospectives and pair programming.
        <br />• This position pushed me to work on all aspects of the stack and
        gain a deeper understanding of how it all communicates and functions
        together
      </>
    ),
    current: false,
    image: "https://static.callummclu.co.uk/experience/evata-logo.webp",
  },
  {
    company: "CREATe",
    title: "Software Engineer",
    period: "Aug 2021 - Apr 2022",
    description: (
      <>
        • Developed a backend capable of performing user authentication as well
        as basic REST api calls using laravel.
        <br />• Used React to develop a responsive front end site to allow users
        easy navigation to old copyright documents including search
        functionality and filtering.
        <br />• Followed agile methodologies with heavy emphasis on
        retrospectives, scrum meetings and pair programming.
        <br />• During this position I learned how to adapt and overcome the
        usage of unknown technologies to solve a common problem
      </>
    ),
    current: false,
    image: "https://static.callummclu.co.uk/experience/create-logo.webp",
  },
];

export default function LandingPage() {
  const cardVariants: Variants = {
    onscreen: {
      y: 50,
      transition: {
        type: "spring",
        bounce: 0.5,
        duration: 0.8,
      },
    },
  };

  const [posts, setPosts] = useState<{ data: ProjectPost[] }>({ data: [] });

  const [origin, setOrigin] = useState<string>("");

  useEffect(() => {
    getAllSpotlights().then(async (res: Response) => {
      const res_json = await res.json();
      setPosts(res_json);
    });

    if (window !== undefined) {
      setOrigin(window.location.origin);
    }
  }, []);

  useWindowEvent("keydown", (event) => {
    if (event.code === "KeyM" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      window.location.replace("https://admin.callummclu.co.uk");
    }
  });

  return (
    <>
      <Head>
        <title>Callum McLuskey</title>
        <meta
          name="description"
          content="Hi i'm Callum McLuskey a 4th year student at Glasgow University and avid Full stack software engineer working at guitarguitar."
        />
      </Head>
      <motion.div
        id="about"
        className={styles["card-container-banner"]}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
      >
        <motion.div className={styles.card} variants={cardVariants}>
          <div className={styles.banner}>
            <div className={styles["text-container"]}>
              <h1>
                Hey 👋, I'm{" "}
                <Text
                  variant="gradient"
                  gradient={{ from: "darkgreen", to: "teal", deg: 45 }}
                  sx={{ display: "inline" }}
                >
                  Callum McLuskey
                </Text>
                <br />
              </h1>
              <h1>A Full stack engineer</h1>
              <Space h="md"></Space>
              <Text size="lg" color="dimmed">
                I'm a recent graduate with passion for all things software, from
                web (as a full stack developer), mobile to cli applications. I
                love venturing into areas such as UI/UX incorporating graphic
                design wherever possible.
              </Text>
            </div>
            <Space h="xl"></Space>
            <Avatar
              alt="callum mcluskey"
              radius={200}
              size={300}
              src={
                "https://static.callummclu.co.uk/main/banner_image.webp" ?? ""
              }
            ></Avatar>
          </div>
        </motion.div>
      </motion.div>

      <div
        style={{
          width: "calc(100% + 100px)",
          marginLeft: -50,
          height: "auto",
          paddingBottom: 10,
          marginTop: -100,
        }}
      >
        <div id="work"></div>
        <div className={styles.wave}></div>
        <div style={{ background: "#009473", paddingTop: 100 }}>
          <ExperienceCard />
          <div id="technologies"></div>
        </div>
        <div className={styles["wave--reverse"]}></div>
        <div style={{ paddingTop: 100 }}>
          <TechnologiesCard />
        </div>
        <div className={styles.wave}></div>
        <div id="projects"></div>

        <div style={{ background: "#009473", paddingTop: 100 }}>
          <Title
            mt={25}
            className="dark-text"
            order={2}
            sx={{ textAlign: "center", fontSize: 35, marginBottom: 0 }}
            px={40}
          >
            🧑🏼‍💻 Personal Projects
          </Title>
          <Text
            px={50}
            size="lg"
            className="dark-text"
            style={{ textAlign: "center" }}
          >
            A selection of some of the best personal projects ive taken on.
          </Text>
          <div className={styles.projects}>
            <Container py={75}>
              {posts?.data ? (
                posts.data.length > 0 ? (
                  posts?.data?.map((item) => (
                    <Fragment key={item.id}>
                      {item.isspotlight && (
                        <ProjectItem
                          isorganisation={item.isorganisation}
                          {...item}
                        />
                      )}
                    </Fragment>
                  ))
                ) : (
                  <p style={{ textAlign: "center", color: "white" }}>
                    No data :(
                  </p>
                )
              ) : (
                <LoadingOverlay
                  loader={<Loader color="green" />}
                  visible={true}
                  overlayBlur={2}
                />
              )}

              <Flex
                justify="center"
                align="center"
                wrap="wrap"
                sx={{ margin: 0, marginTop: 60, minWidth: 250 }}
                color="white"
              >
                <Text color="white">
                  View more here under{" "}
                  <Anchor
                    sx={{ textDecoration: "underline" }}
                    href={`${origin}/project`}
                    color="white"
                  >
                    projects
                  </Anchor>{" "}
                  or{" "}
                  <Anchor
                    sx={{ textDecoration: "underline" }}
                    href={`${origin}/organisation`}
                    color="white"
                  >
                    organisations
                  </Anchor>{" "}
                </Text>
              </Flex>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}

const TechnologiesCard = () => {
  return (
    <>
      <Title
        order={2}
        sx={{ textAlign: "center", fontSize: 35, marginBottom: 0 }}
        px={40}
      >
        🤖 Technologies
      </Title>
      <Text
        px={50}
        sx={{ textAlign: "center", marginTop: 5, marginBottom: 0 }}
        size="lg"
      >
        Technologies and languages im comfortable working with in a professional
        environment.
      </Text>
      <Container pb={25} mt={75}>
        <Flex wrap={"wrap"} justify="center">
          {technologies.map((tech) => (
            <TechnologyCard name={tech} />
          ))}
        </Flex>
      </Container>
    </>
  );
};

const ExperienceCard = () => {
  return (
    <>
      <Title
        mt={50}
        className="dark-text"
        order={2}
        sx={{ textAlign: "center", fontSize: 35, marginBottom: 0 }}
        px={40}
      >
        💻 Work Experience
      </Title>
      <Text
        px={50}
        className="dark-text"
        sx={{ textAlign: "center", marginTop: 5, marginBottom: 0 }}
        size="lg"
      >
        Some commercial experience ive gained over the years.
      </Text>

      <Container pb={50}>
        <Box mt={50} p={50}>
          <Timeline color="white" active={3}>
            {experiences.map((exp) => (
              <Timeline.Item
                key={exp.period}
                className="dark-text"
                bullet={
                  <Avatar
                    size={70}
                    radius={"100%"}
                    alt={exp.company}
                    src={exp.image}
                  />
                }
                title={exp.company}
                bulletSize={75}
                color="white"
                radius={"100%"}
                sx={{
                  "& .mantine-Timeline-itemTitle": {
                    marginLeft: 20,
                    fontWeight: 500,
                    fontSize: 24,
                    marginBottom: 0,
                  },
                }}
              >
                <Stack spacing={0}>
                  <Text
                    mb={5}
                    ml={20}
                    className="dark-text"
                    size="sm"
                    fs="italic"
                  >
                    {exp.title}
                  </Text>
                  <Text ml={20} size="sm" className="dark-text" mb={5}>
                    <Group align="center" spacing={0}>
                      {exp.period
                        .replace("-", "-to-")
                        .split("-")

                        .map((period) => (
                          <>
                            {period === "to" ? (
                              <RiArrowRightSLine size={15} />
                            ) : (
                              <Badge
                                className="white"
                                key={period}
                                variant="outline"
                                color="green"
                                mr={3}
                              >
                                {period}
                              </Badge>
                            )}
                          </>
                        ))}
                    </Group>
                  </Text>
                </Stack>
                <Text
                  ml={20}
                  size="sm"
                  mt={3}
                  className="dark-text"
                  c={"rgb(60,60,60)"}
                >
                  {exp.description}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </Box>
        <div id="technologies"></div>
      </Container>
    </>
  );
};
