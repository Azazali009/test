import supabase, { supabaseUrl } from "@/supabase/supabase";

export async function getUsers() {
  let { data, error } = await supabase.from("user").select("*");

  if (error) {
    console.log(error);
    throw new Error(error, "unable to load user");
  }

  return data;
}

export async function deleteUser(id) {
  console.log(id);
  const { data, error } = await supabase.from("user").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("unable to delete user");
  }

  return data;
}

export async function createUser(userData) {
  const imageName = `${Math.random()}-${userData.image.name}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/avatar/${imageName}`;

  const { data, error } = await supabase
    .from("user")
    .insert([{ ...userData, image: imagePath }])
    .select()
    .single();
  if (error?.code === "23505") {
    console.log(error);
    throw new Error("Email already registered");
  } else if (error) {
    throw new Error("something went wrong. Try again letter.");
  }

  const { error: imageError } = await supabase.storage
    .from("avatar")
    .upload(imageName, userData.image, {
      cacheControl: 3600,
      upsert: false,
    });

  if (imageError) {
    await supabase.from("user").delete().eq("id", data.id);
    console.log(imageError);
    throw new Error(
      "User photo could not be uploaded therefore user are not created!"
    );
  }

  return data;
}

export async function updateUser(updateObj, id) {
  const hasImagePath = updateObj.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${updateObj.image.name}`;

  const imagePath = hasImagePath
    ? updateObj.image
    : `${supabaseUrl}/storage/v1/object/public/avatar/${imageName}`;

  const { data, error } = await supabase
    .from("user")
    .update({ ...updateObj, image: imagePath })
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
    throw new Error("Could't update user!");
  }
  if (hasImagePath) return data;

  const { error: imageError } = await supabase.storage
    .from("avatar")
    .upload(imageName, updateObj.image, {
      cacheControl: 3600,
      upsert: false,
    });

  if (imageError) {
    throw new Error("Photo could't updated.");
  }
  return data;
}
