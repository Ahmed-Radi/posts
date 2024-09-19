import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { SetStateAction, useEffect } from "react";
import { IPost } from "../types";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchemaAddUpdatePost } from "../schema";
import { useCreatePost, useUpdatePost } from "../services/mutations";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

type Props = {
	setSelectedPost: React.Dispatch<SetStateAction<IPost | null>>;
	selectedPost: IPost | null;
	open: boolean;
	setOpen: React.Dispatch<SetStateAction<boolean>>;
};

const UpdateDialog = ({
	selectedPost,
	setSelectedPost,
	open,
	setOpen,
}: Props) => {
	const updatePost = useUpdatePost();
	const createPost = useCreatePost();

	const form = useForm<z.infer<typeof formSchemaAddUpdatePost>>({
		resolver: zodResolver(formSchemaAddUpdatePost),
		defaultValues: {
			title: "",
			body: "",
		},
	});

	useEffect(() => {
		if (selectedPost) {
			form.reset({
				title: selectedPost.title || "",
				body: selectedPost.body || "",
			});
		}
	}, [selectedPost, form]);

	function onSubmit(values: z.infer<typeof formSchemaAddUpdatePost>) {
		if (selectedPost) {
			updatePost.mutate(
				{ ...selectedPost, ...values },
				{
					onSuccess: () => {
						form.reset();
						setOpen(false);
					},
					onError: error => {
						console.error("Update failed:", error);
					},
				}
			);
		} else {
			createPost.mutate(
				{ ...values },
				{
					onSuccess: () => {
						form.reset();
						setOpen(false);
					},
					onError: error => {
						console.error("Create failed:", error);
					},
				}
			);
		}
	}

	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			className='relative z-10'>
			<DialogBackdrop
				transition
				className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
			/>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
						<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
							<DialogPanel
								transition
								className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95'>
								<div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
									<div className='sm:flex sm:items-start'>
										<div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full'>
											<DialogTitle
												as='h3'
												className='text-base font-semibold leading-6 text-gray-900'>
												{selectedPost ? "Update" : "Create"} Post
											</DialogTitle>
											<div className='mt-2 w-full'>
												<h3 className='text-md text-gray-600 mb-2'>
													Post title:
												</h3>
												<FormField
													control={form.control}
													name='title'
													render={({ field }) => (
														<FormItem>
															<FormControl>
																<Input
																	{...field}
																	placeholder='Type your text please.'
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
											<div className='mt-2 w-full'>
												<h3 className='text-md text-gray-600 mb-2'>
													Post body:
												</h3>
												<FormField
													control={form.control}
													name='body'
													render={({ field }) => (
														<FormItem>
															<FormControl>
																<Textarea
																	{...field}
																	placeholder='Type your text please.'
																	rows={5}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
									<button
										type='submit'
										disabled={
											updatePost.isPending ||
											createPost.isPending
										}
										className='inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 sm:ml-3 sm:w-auto disabled:bg-gray-500 disabled:cursor-not-allowed'>
										{selectedPost ? "Update" : "Create"}
									</button>
									<button
										type='button'
										data-autofocus
										onClick={() => {
											setSelectedPost(null);
											form.reset({
												title: "",
												body: "",
											});
											setOpen(false);
										}}
										className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'>
										Cancel
									</button>
								</div>
							</DialogPanel>
						</div>
					</div>
				</form>
			</Form>
		</Dialog>
	);
};

export default UpdateDialog;
