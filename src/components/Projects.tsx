import { Project } from "@prisma/client";
import { FormEvent, useState } from "react";
import { api } from "~/utils/api";
export const Projects = () => {
  const [name, setTopic] = useState("");
  const [desc, setDesc] = useState("");
  const [gitrepo, setGitrepo] = useState("");

  const projects = api.project.projects.useQuery();

  console.log(projects.data);

  const createProject = api.project.createProject.useMutation({
    onSuccess: (newProject) => {
      console.log(newProject);
      setTopic("");
      setDesc("");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    // You can pass formData as a fetch body directly:

    // You can generate a URL out of it, as the browser does by default:
    console.log(new URLSearchParams(formData).toString());
    // You can work with it as a plain object.
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson); // (!) This doesn't include multiple select values
    // Or you can get an array of name-value pairs.
    console.log([...formData.entries()]);

    createProject.mutate(formJson);
  };

  return (
    <div className="w-full gap-2 bg-white px-2">
      <h2 className="pt-6 font-bold">Recent projects</h2>
      <div className="grid grid-cols-1 pt-2 sm:grid-cols-2 md:gap-8">
        {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          projects?.data?.map((int: Project) => {
            return (
              <div key={int.id} className="card py-2">
                <h3 className="text-2xl font-bold">{int.name}</h3>
                <div className="text-lg">{int.desc}</div>
                <span>{int.gitrepo}</span>
              </div>
            );
          })
        }
      </div>
      <div className="pt-6">
        <fieldset className="border-2 px-2">
          <legend>Add project</legend>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center gap-2 py-2"
          >
            <input
              type="text"
              name="name"
              autoFocus
              placeholder="Enter name"
              value={name}
              onChange={(e) => setTopic(e.target.value)}
            />
            <br />
            <input
              type="textarea"
              name="desc"
              placeholder="Enter description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <br />
            <input
              type="text"
              name="gitrepo"
              placeholder="Enter link to git repo"
              value={gitrepo}
              onChange={(e) => setGitrepo(e.target.value)}
            />
            <br />

            <button
              type="submit"
              className="w-full rounded bg-blue-500 px-2 py-2 text-white"
            >
              Create project
            </button>
          </form>
        </fieldset>
      </div>
    </div>
  );
};
