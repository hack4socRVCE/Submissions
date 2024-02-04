from .generate_manim_code import GenerationModel
from .generate_video_from_code import GenerateVideo

class Model:
    def __init__(self, text) -> None:
        self.generateManimCode = GenerationModel()
        self.text = text

    def start(self):
        manim_code = self.generateManimCode.generate(self.text)
        generateVideo = GenerateVideo(manim_code=manim_code)
        generateVideo.createVideo()

if __name__ == "__main__":
    model = Model(
        '''a```python
from manim import *

class FollowTrajectory(Scene):
    def construct(self):
        x_shift = -3.75
        y_shift = -1.25
        velocity = 40
        theta = 60 * DEGREES
        g = 10
        timeOfFlight = 2 * velocity * np.sin(theta) / g
        horizontalRange = velocity**2 * np.sin(2 * theta) / g
        maxHeight = ((velocity * np.sin(theta))**2) / (2 * g)
        scale = horizontalRange / 8
        trajectory = ParametricFunction(
            lambda t: np.array([(velocity * t * np.cos(theta)) / scale + x_shift, (velocity * t * np.sin(theta) - 0.5 * g * t**2) / scale + y_shift, 0]),      
            t_range=[0, timeOfFlight, 0.1],
            color=YELLOW
        )

        dot = Dot(color=RED)

        x_min = -5
        x_max = 35
        y_min = -5
        y_max = 15

        axis = NumberPlane(
            x_range=[x_min, x_max, 2],
            y_range=[y_min, y_max, 2],
            x_length=10,
            y_length=5,
            axis_config={"color": BLUE},
            background_line_style={"stroke_color": WHITE, "stroke_width": 2, "stroke_opacity": 0.5},
        )

        self.add(axis)

        # Create a label that constantly updates to display the x and y coordinates of the dot
        label = always_redraw(lambda: MathTex(f"x = {(dot.get_center()[0]-x_shift)*scale:.2f}", f"y = {(dot.get_center()[1]-y_shift)*scale:.2f}").next_to(dot, UP))

        self.add(dot, label)
        self.play(Create(trajectory), MoveAlongPath(dot, trajectory), run_time=1)

        brace = Brace(trajectory, DOWN, buff=0.3)
        brace_label = brace.get_tex(f"Range = {horizontalRange:.2f}")

        self.play(Create(brace), Write(brace_label))

        start_point = trajectory.get_start()
        end_point = trajectory.get_top()
        height_brace = Brace(Line(start_point, end_point), LEFT, buff=0.3)
        height_brace_label = height_brace.get_tex(f"Height = {maxHeight:.2f}").scale(0.5).shift(RIGHT)
        self.play(Create(height_brace), Write(height_brace_label))

        self.wait()

if __name__ == "__main__":
    scene = FollowTrajectory()
    scene.render()
```a'''
    )
    model.start()