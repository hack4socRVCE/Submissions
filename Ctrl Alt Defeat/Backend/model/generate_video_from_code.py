import shutil
import os

class GenerateVideo:
    def __init__(self, manim_code) -> None:
        self.manim_code = manim_code

    def createVideo(self):
        class_name = self.getClassName()
        try:
            only_code = self.manim_code.split("```")[1][6:]
        except:
            print(self.manim_code)
            print("ERROR")
            only_code = self.manim_code

        with open(f'{class_name}.py', "w") as f:
            f.write(only_code)
        os.system(f"manim {class_name}.py {class_name} -pql")
        self.move_video()
        self.clean_up()

    def getClassName(self):
        for line in self.manim_code.split("\n"):
            if line.startswith("class"):
                return line[6:line.index('(')]
            
    def move_video(self):
        class_name = self.getClassName()
        shutil.move(f"media/videos/{class_name}/480p15/{class_name}.mp4", "OUTPUT.mp4")

    def clean_up(self):
        class_name = self.getClassName()
        os.remove(f'{class_name}.py')

if __name__ == "__main__":
    genVideo = GenerateVideo(
        '''from manim import *

class PointMovingOnShapes(Scene):
    def construct(self):
        circle = Circle(radius=1, color=BLUE)
        dot = Dot()
        dot2 = dot.copy().shift(RIGHT)
        self.add(dot)

        line = Line([3, 0, 0], [5, 0, 0])
        self.add(line)

        self.play(GrowFromCenter(circle))
        self.play(Transform(dot, dot2))
        self.play(MoveAlongPath(dot, circle), run_time=2, rate_func=linear)
        self.play(Rotating(dot, about_point=[2, 0, 0]), run_time=1.5)
        self.wait()

if __name__ == "__main__":
    scene = PointMovingOnShapes()
    scene.render()
'''
    )
    genVideo.createVideo()
        