import React from "react";
import Modal from "../Modal";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useCreateMovie from "@/hooks/movie/useCreateMovie";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/globalContext";

function ModalMovies() {
  const { mutate: createMovie } = useCreateMovie();
  const { closeModal } = useGlobalContext();

  const router = useRouter();

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      createMovie(
        { title, description },
        {
          onSuccess: (movie) => {
            router.push(`/admin/movies/${movie.id}`);
            closeModal();
          },
        },
      );
    } catch (error) {
      console.log("Error creating movie", error);
    }
  };

  return (
    <Modal>
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Add Movie</h1>

        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter movie title"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Description</Label>
          <Input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter movie description"
          />
        </div>

        <Button type="submit" variant={"brand-primary"} className="h-12">
          Add Movie
        </Button>
      </form>
    </Modal>
  );
}

export default ModalMovies;
