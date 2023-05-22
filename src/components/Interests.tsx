import { Interest } from "@prisma/client";
import { FormEvent, useState } from "react";
import { api } from "~/utils/api";
export const Interests = () => {
  const [topic, setTopic] = useState("");
  const [desc, setDesc] = useState("");
  // const [proficiency, setproficiency] = useState("BEGINNER");
  const interests = api.interest.interests.useQuery();
  console.log(interests.data);
  const createInterest = api.interest.createInterest.useMutation({
    onSuccess: (newInterest) => {
      console.log(newInterest);
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

    createInterest.mutate(formJson);
  };

  return (
    <div className="w-full gap-2 bg-white px-2">
      <h2 className="pt-6 font-bold">Recent interests</h2>
      <div className="grid grid-cols-1 pt-2 sm:grid-cols-2 md:gap-8">
        {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call

          interests?.data?.map((int: Interest) => {
            return (
              <div key={int.id} className="card py-2">
                <h3 className="text-2xl font-bold">{int.topic}</h3>
                <div className="text-lg">{int.desc}</div>
                <span>{int.proficiency}</span>
              </div>
            );
          })
        }
      </div>
      <div className="pt-6">
        <fieldset className="border-2 px-2">
          <legend>Add interest</legend>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center gap-2 py-2"
          >
            <input
              type="text"
              name="topic"
              autoFocus
              placeholder="Enter topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <br></br>
            <input
              type="textarea"
              name="desc"
              placeholder="Enter description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <br></br>
            <label>
              Proficiency:
              <select name="proficiency" defaultValue="BEGINNER">
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
            </label>
            <br />
            <button
              type="submit"
              className="w-full rounded bg-blue-500 px-2 py-2 text-white"
            >
              Create interest
            </button>
          </form>
        </fieldset>
      </div>
    </div>
  );
};
